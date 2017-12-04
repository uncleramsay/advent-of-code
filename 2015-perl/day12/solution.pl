use strict;
use warnings;
use JSON;
use Scalar::Util qw(looks_like_number);
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

sub one {
  my $sCount = 0;

  my $rJson; # Hashref
  $rJson = decode_json($aLines[0]);

  traverseHash($rJson, sub {
    $sCount += shift @_;
  });

  return $sCount;
}

sub two {
  my $sCount = 0;

  my $rJson; # Hashref
  $rJson = decode_json($aLines[0]);

  traverseHash($rJson, sub {
    $sCount += shift @_;
  }, 'red');

  return $sCount;
}

sub traverseHash {
  my %hHash = %{shift @_};
  my $fn = shift @_;
  my $sIgnore = shift @_;

  if(defined($sIgnore) && grep {$_ eq $sIgnore} values %hHash) {
    return;
  }

  foreach my $sKey (keys %hHash) {
    my $sValue = $hHash{$sKey};

    operateOnValue($sValue, $fn, $sIgnore);
  }
}

sub traverseArray {
  my @aArray = @{shift @_};
  my $fn = shift @_;
  my $sIgnore = shift @_;

  foreach my $sValue (@aArray) {
    operateOnValue($sValue, $fn, $sIgnore);
  }
}

sub operateOnValue {
  my $sValue = shift @_;
  my $fn = shift @_;
  my $sIgnore = shift @_;

  if (looks_like_number($sValue)) {
    $fn->($sValue);
  }

  if (ref $sValue eq 'HASH') {
    traverseHash($sValue, $fn, $sIgnore);
  } elsif (ref $sValue eq 'ARRAY') {
    traverseArray($sValue, $fn, $sIgnore);
  }
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";

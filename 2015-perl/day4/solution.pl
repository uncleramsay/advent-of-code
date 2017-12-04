use strict;
use warnings;
use Digest::MD5 qw(md5_hex);
use Data::Dumper;

# my @aLines = ();
# open(my $fh, '<', 'input.txt');
# while(defined(my $sLine = <$fh>)) {
#   chomp($sLine);
#   push(@aLines, $sLine);
# }
# close($fh);

sub one {
  return findZeroes(5);
}

sub two {
  return findZeroes(6);
}

sub findZeroes {
  my $sZeroes = shift @_;
  my $sInput = 'yzbqklnj';

  for(my $i = 1;; $i++) {
    my $sKey = $sInput . $i;

    my $sMD5 = md5_hex($sKey);
    if($sMD5 =~ /^0{$sZeroes}/) {
      return $i;
    }
  }

  return '';
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
